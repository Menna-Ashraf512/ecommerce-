import { brands, Metadata } from "../brands/ibrands"

export interface Icategory {
    results: number
    metadata: Metadata
    data: brands[]
}
