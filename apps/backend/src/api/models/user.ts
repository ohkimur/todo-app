import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript'
import { AuthToken, generateAuthToken } from '../.'

@Table({ tableName: 'users' })
export class User extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email!: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  fullName: string

  @HasMany(() => AuthToken)
  authTokens: AuthToken[] = []
}

export const authorizeUser = async (user: User) => {
  const authToken = await generateAuthToken(user.id)
  user.authTokens.push(authToken)
  return { user, authToken }
}
