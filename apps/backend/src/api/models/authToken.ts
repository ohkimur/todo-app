import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript'
import { User } from '.'

@Table({ tableName: 'authTokens' })
export class AuthToken extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  token!: string

  @BelongsTo(() => User)
  user!: User

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId!: number
}
