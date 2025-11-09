import { AllowNull, BelongsTo, BelongsToMany, Column, DataType, Default, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
const { DataTypes } = require('sequelize');
import Like from "./Likes";



@Table({
    underscored: true,
    timestamps: false
})
export default class Vacation extends Model {

    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id: string

    @AllowNull(false)
    @Column(DataType.STRING)
    destination: string

     @AllowNull(false)
    @Column(DataType.TEXT)
    description:string

    @AllowNull(false)
    @Default(DataTypes.NOW)
    @Column(DataType.DATE)
    startedAt: Date

    @AllowNull(false)
    @Default(DataTypes.NOW)
    @Column(DataType.DATE)
    endedAt: Date

    @AllowNull(false)
    @Column(DataType.FLOAT)
    price: number

    @AllowNull(true)
    @Column(DataType.STRING)
    imageUrl: string

    @HasMany(() => Like)
    likes: Like[]

}