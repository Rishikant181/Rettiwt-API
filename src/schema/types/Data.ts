// This file contains various interfaces that make handling custom data types easier

/**
 * @summary Any class that implements Deserializable means that the class can be used to store data.
 * Data is stored in the class by using the deserialize() method by passing in the data to store. * 
 * 
 * **NOTE**: Exactly how the data is parsed and stored is handled by the class
 */
export interface Deserializable {
    /**
     * @summary Stores the input JSON data in the invoking object
     * @returns An object of the same type as invoking class, containing the json data
     * @param data The json data to be parsed and stored in this object
     */
    deserialize(data: any): this; 
}