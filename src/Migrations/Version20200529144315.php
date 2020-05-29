<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200529144315 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE destination (id INT AUTO_INCREMENT NOT NULL, title VARCHAR(255) NOT NULL, description LONGTEXT NOT NULL, pays VARCHAR(255) NOT NULL, city VARCHAR(255) NOT NULL, image LONGTEXT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE tours (id INT AUTO_INCREMENT NOT NULL, title VARCHAR(255) NOT NULL, description LONGTEXT NOT NULL, days INT NOT NULL, price INT NOT NULL, image LONGTEXT NOT NULL, name_image VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE destination_tours (tours_id INT NOT NULL, destination_id INT NOT NULL, INDEX IDX_7E7766BD8B14082 (tours_id), INDEX IDX_7E7766BD816C6140 (destination_id), PRIMARY KEY(tours_id, destination_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, email VARCHAR(180) NOT NULL, roles JSON NOT NULL, password VARCHAR(255) NOT NULL, first_name VARCHAR(255) NOT NULL, last_name VARCHAR(255) NOT NULL, UNIQUE INDEX UNIQ_8D93D649E7927C74 (email), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user_tours (user_id INT NOT NULL, tours_id INT NOT NULL, INDEX IDX_CDC83C56A76ED395 (user_id), INDEX IDX_CDC83C568B14082 (tours_id), PRIMARY KEY(user_id, tours_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE destination_tours ADD CONSTRAINT FK_7E7766BD8B14082 FOREIGN KEY (tours_id) REFERENCES tours (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE destination_tours ADD CONSTRAINT FK_7E7766BD816C6140 FOREIGN KEY (destination_id) REFERENCES destination (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE user_tours ADD CONSTRAINT FK_CDC83C56A76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE user_tours ADD CONSTRAINT FK_CDC83C568B14082 FOREIGN KEY (tours_id) REFERENCES tours (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE destination_tours DROP FOREIGN KEY FK_7E7766BD816C6140');
        $this->addSql('ALTER TABLE destination_tours DROP FOREIGN KEY FK_7E7766BD8B14082');
        $this->addSql('ALTER TABLE user_tours DROP FOREIGN KEY FK_CDC83C568B14082');
        $this->addSql('ALTER TABLE user_tours DROP FOREIGN KEY FK_CDC83C56A76ED395');
        $this->addSql('DROP TABLE destination');
        $this->addSql('DROP TABLE tours');
        $this->addSql('DROP TABLE destination_tours');
        $this->addSql('DROP TABLE user');
        $this->addSql('DROP TABLE user_tours');
    }
}
