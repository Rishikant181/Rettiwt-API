// TYPES
import { DataContext } from '../../types/Service';

export default class ResolverBase {
    // MEMBER DATA
    protected context: DataContext;                                         // To store the data context

    // MEMBER METHODS
    constructor(context: DataContext) {
        this.context = context;
    }
}