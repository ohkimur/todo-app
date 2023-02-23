import { Column, DataType, Model, Table } from 'sequelize-typescript'

@Table({ tableName: 'users' })
export class User extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email!: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  username: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string
}
