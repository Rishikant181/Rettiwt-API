// This file contains various interfaces that make handling custom data types easier

export interface Deserializable {
    /*
    The deserialize method, when implemented by a class, is used to assign an input json data into the implementing class
    This can be used to store arbitraty json data in a TypeScript object
    */
    deserialize(data: any): this; 
}