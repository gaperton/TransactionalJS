import { GenericAttribute, AttributeDescriptor } from './record/attribute.ts'
import { CompiledReference, ResolveReference } from './objectplus/traversable.ts'
import { Collection } from './collection/index.ts'
import { Record } from './record/index.ts'

import { ChainableAttributeSpec } from './record/typespec.ts'

/********
 * Reference to model by id.
 * 
 * Untyped attribute. Holds model id, when unresolved. When resolved, is substituted
 * with a real model.
 * 
 * No model changes are detected and counted as owner's change. That's intentional.
 */
type RecordRefValue = Record | string;

class RecordRefAttribute extends GenericAttribute {
    // It is always serialized as an id, whenever it's resolved or not. 
    toJSON( value : RecordRefValue ){
        return value && typeof value === 'object' ? value.id : value;
    }

    // Wne 
    clone( value : RecordRefValue ){
        return value && typeof value === 'object' ? value.id : value;
    }

    // Model refs by id are equal when their ids are equal.
    isChanged( a : RecordRefValue, b : RecordRefValue){
        var aId = a && ( (<Record>a).id == null ? a : (<Record>a).id ),
            bId = b && ( (<Record>b).id == null ? b : (<Record>b).id );

        return aId !== bId;
    }

    // Refs are always valid.
    validate( model, value, name ){}
}

type CollectionReference = ( () => Collection ) | Collection | string; 

function parseReference( collectionRef : CollectionReference ) : ( root : Record ) => Collection {
    switch( typeof collectionRef ){
        case 'function' :
            return root => (<any>collectionRef).call( root );
        case 'object'   :
            return () => <Collection>collectionRef;
        case 'string'   :
            const { resolve } = new CompiledReference( <string>collectionRef );
            return resolve;
    }
}

export function from( masterCollection : CollectionReference ) : ChainableAttributeSpec {
    const getMasterCollection = parseReference( masterCollection );

    const typeSpec = new ChainableAttributeSpec({
        value : null,
        _attribute : RecordRefAttribute
    });
    
    typeSpec
        .get( function( objOrId : RecordRefValue, name : string ) : Record {
            if( typeof objOrId !== 'object' ){
                // So, we're dealing with an id reference. Resolve it.
                const collection = getMasterCollection( this );

                // If master collection exists and is not empty...
                if( collection && collection.length ){
                    // Silently update attribute with record from this collection.
                    const record = collection.get( objOrId ) || null;
                    this.attributes[ name ] = record;

                    // Subscribe for events manually. delegateEvents won't be invoked.
                    record && this._attributes[ name ].handleChange( record, null, this );
                }
                else{
                    objOrId = null;
                }
            }

            return <Record>objOrId;
        });

    return typeSpec;
};

/********************************
 * Collection.subsetOf
 * 
 * Todo: we need special collection type which do not attempt to take ownership on its members.
 * It can't be serialized. It must not do deep updates. It must listen to members changes in regular way.
 * 
 * It needs to be dynamic mixin/subclass of the particular collection.
 * 
 * SubsetOf will extend this collection, and turn off change events counting toward changes event.
 * It must add serialization and master collection.
 * 
 * May be, it will be the same type.
 * 
 * Same problem with shared Model attribute - it will behave _really_ strange now. At first, it won't get updates.
 * Well, what we can do, is that if Model/Collection can't get ownership,
 * it will subscribe for 'change' event instead (and put the deprecation warning in the console).
 * Serialization might be turned off in this case.
 * 
 * Model.ref and Collection.refs won't take ownership, won't be serialized, but will listen to the changes. 
 */
