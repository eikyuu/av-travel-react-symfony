<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200810221205 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE opinion DROP FOREIGN KEY FK_AB02B0278B14082');
        $this->addSql('DROP INDEX IDX_AB02B0278B14082 ON opinion');
        $this->addSql('ALTER TABLE opinion DROP tours_id');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE opinion ADD tours_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE opinion ADD CONSTRAINT FK_AB02B0278B14082 FOREIGN KEY (tours_id) REFERENCES tours (id)');
        $this->addSql('CREATE INDEX IDX_AB02B0278B14082 ON opinion (tours_id)');
    }
}
