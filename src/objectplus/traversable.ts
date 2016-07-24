/**
 * Some sketches for reference resolution.
 *
 * 
 * a : Model.from( '~collection' )
 * 
 * We need two functions. One for get, and one for compile. 
 */
export interface Traversable {
    getStore() : Traversable
    getOwner() : Traversable
    get( key : string ) : any 
}

const referenceMask =  /\~|\^|([^.]+)/g;

// Compile reference to function

export class CompiledReference {
    resolve : ( root : Traversable ) => any
    tail : string
    local : boolean

    constructor( reference : string, splitTail : boolean = false ){
        const path = reference
                        .match( referenceMask )
                        .map( key => key === '~' ? 'getStore()' : ( key === '^' ? 'getOwner()' : key ) );
               
        this.tail = splitTail && path.pop();
        this.local = !path.length;

        path.unshift( 'self' );
        
        this.resolve = <any> new Function( 'self', `return ${ path };` );
    }
}

export function resolveReference( root : Traversable, reference : string, action : ( object, key : string ) => any ) : any {
    const path = reference.match( referenceMask ),
          skip = path.length - 1;
    
    let self = root;

    for( var i = 0; i < skip; i++ ){
        const key = path[ i ];
        switch( key ){
            case '~' : self = self.getStore(); break;
            case '^' : self = self.getOwner(); break;
            default  : self = self.get( key );
        }

        // Do nothing if object on the path doesn't exist.
        if( !self ) return;
    }

    action( self, path[ skip ] );
    return self;
}

// Construct object reference { a : { b : { c : 0 } } }
export function referenceToObject( reference, value ){
    const path = reference.split( '.' ),
          root = {},
          last = path.length - 1;
    let current = root;

    for( let i = 0; i < last; i++ ){
        current = current[ path[ i ] ] = {};
    }

    current[ path[ last ] ] = value;

    return root;
}