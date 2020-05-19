<?php

namespace App\Repository;

use App\Entity\Tours;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Tours|null find($id, $lockMode = null, $lockVersion = null)
 * @method Tours|null findOneBy(array $criteria, array $orderBy = null)
 * @method Tours[]    findAll()
 * @method Tours[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ToursRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Tours::class);
    }

    // /**
    //  * @return Tours[] Returns an array of Tours objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('t')
            ->andWhere('t.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('t.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Tours
    {
        return $this->createQueryBuilder('t')
            ->andWhere('t.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
