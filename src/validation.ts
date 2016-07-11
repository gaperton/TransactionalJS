export interface ChildrenErrors {
    [ key : string ] : ValidationError | any
} 

export interface Validatable {
    _validateNested( errors : ChildrenErrors ) : number;
    validate( self : any ) : any
    get( key : string ) : any
}

// Validation error object.
export class ValidationError {
    // Invalid nested object keys 
    nested : ChildrenErrors 
    length : number

    // Local error
    error : any

    constructor( obj : Validatable ){
        this.length = obj._validateNested( this.nested = {} );

        if( this.error = obj.validate( obj ) ){
            this.length++;
        }
    }

    each( iteratee : ( value : any, key : string ) => void ){
        const { error, nested } = this;

        if( error ) iteratee( error, null );

        for( const key in nested ){
            iteratee( nested[ key ], key );
        }
    }

    eachError( iteratee : ( error : any, key : string, object : Validatable ) => void, object : Validatable ){
        this.each( ( value, key ) => {
            if( value instanceof ValidationError ){
                value._traverse( iteratee, object.get( key ) );
            }
            else{
                iteratee( value, key, object );
            }
        });
    }
}