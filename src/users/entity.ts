import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { BaseEntity } from "typeorm/repository/BaseEntity";
import { IsString, MinLength, IsEmail } from "class-validator";
import { Exclude } from "class-transformer";
import * as bcrypt from "bcrypt";

@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  //   @Column("text", { nullable: false })
  //   firstName: string;
  //the same with validation:
  @IsString()
  @MinLength(2)
  @Column("text")
  firstName: string;

  //   @Column("text", { nullable: false })
  //   lastName: string;
  //the same with validation:
  @IsString()
  @MinLength(2)
  @Column("text")
  lastName: string;

  //email is a valid email:
  @Column("text", { nullable: false })
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @Column("text", { nullable: true })
  @Exclude({ toPlainOnly: true })
  password: string;

  //   @Column("text")
  //   city: string;
  //the same with validation:
  @IsString()
  @MinLength(3)
  @Column("text")
  city: string;

  //using bcrypt to hash the password
  //setting and checking passwords
  async setPassword(rawPassword: string) {
    const hash = await bcrypt.hash(rawPassword, 10);
    this.password = hash;
  }

  checkPassword(rawPassword: string): Promise<boolean> {
    return bcrypt.compare(rawPassword, this.password);
  }
}
