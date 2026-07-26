import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsersDoctorsPatientsTables1784913263156 implements MigrationInterface {
  name = 'CreateUsersDoctorsPatientsTables1784913263156';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('DOCTOR', 'PATIENT')`);

    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true, generationStrategy: 'uuid', default: 'uuid_generate_v4()' },
          { name: 'email', type: 'varchar', isUnique: true },
          { name: 'password', type: 'varchar' },
          { name: 'role', type: 'enum', enum: ['DOCTOR', 'PATIENT'], enumName: 'users_role_enum' },
          { name: 'createdAt', type: 'timestamp', default: 'now()' },
          { name: 'updatedAt', type: 'timestamp', default: 'now()' },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'doctors',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true, generationStrategy: 'uuid', default: 'uuid_generate_v4()' },
          { name: 'userId', type: 'uuid', isUnique: true },
          { name: 'fullName', type: 'varchar' },
          { name: 'specialization', type: 'varchar' },
          { name: 'experienceYears', type: 'int' },
          { name: 'qualification', type: 'varchar' },
          { name: 'consultationFee', type: 'decimal', precision: 10, scale: 2 },
          { name: 'availabilityHours', type: 'varchar' },
          { name: 'profileDetails', type: 'text', isNullable: true },
          { name: 'createdAt', type: 'timestamp', default: 'now()' },
          { name: 'updatedAt', type: 'timestamp', default: 'now()' },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'patients',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true, generationStrategy: 'uuid', default: 'uuid_generate_v4()' },
          { name: 'userId', type: 'uuid', isUnique: true },
          { name: 'fullName', type: 'varchar' },
          { name: 'age', type: 'int' },
          { name: 'gender', type: 'varchar' },
          { name: 'contactNumber', type: 'varchar' },
          { name: 'address', type: 'varchar', isNullable: true },
          { name: 'healthInfo', type: 'text', isNullable: true },
          { name: 'createdAt', type: 'timestamp', default: 'now()' },
          { name: 'updatedAt', type: 'timestamp', default: 'now()' },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('patients');
    await queryRunner.dropTable('doctors');
    await queryRunner.dropTable('users');
    await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
  }
}
