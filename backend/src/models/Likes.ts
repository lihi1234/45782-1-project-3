import { AllowNull, BelongsTo, Column, DataType, Default, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import User from "./User";
import Vacation from "./Vacation";
const { DataTypes } = require('sequelize');
@Table({
    underscored: true,
    timestamps: false
})
export default class Like extends Model {


    @ForeignKey(() => User)
    @AllowNull(false)
    @Column(DataType.UUID)
    userId: string // -> user.id

    @ForeignKey(() => Vacation)
    @AllowNull(false)
    @Column(DataType.UUID)
    vacationId: string // -> vacation.id

    @BelongsTo(() => User)
    user: User;

    @BelongsTo(() => Vacation)
    vacation: Vacation;


}


