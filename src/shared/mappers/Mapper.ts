export interface Mapper<T, U> {
  mapTo(entity: T): U
  mapFrom(dto: U): T
}

