import { AllowNull, Column, DataType, Default, HasMany, Index, Model, PrimaryKey, Table } from "sequelize-typescript";
import Like from "./Likes";
const { DataTypes } = require('sequelize');



export enum Role {
  User = 'user',
  Admin = 'admin',
}

@Table({
    underscored: true,
    timestamps: false
})
export default class User extends Model {

    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id: string

    @AllowNull(false)
    @Column(DataType.STRING)
    firstName: string

     @AllowNull(false)
    @Column(DataType.STRING)
    lastName: string

     @AllowNull(false)
    @Column(DataType.STRING)
    @Index({ unique: true })
    email: string

    @AllowNull(false)
    @Column(DataType.STRING)
    password: string

    @AllowNull(false)
    @Default(Role.User)
    @Column(DataType.ENUM(...Object.values(Role)))
    role: Role

    @HasMany(() => Like, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    
    likes: Like[]


}