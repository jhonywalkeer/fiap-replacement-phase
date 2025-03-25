export class BaseEntity {
  constructor(
    readonly id: string,
    readonly created_at: Date,
    readonly updated_at: Date | null = null
  ) {
    this.id = id
    this.created_at = created_at
    this.updated_at = updated_at
  }
}
