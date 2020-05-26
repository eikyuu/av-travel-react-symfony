<?php

namespace App\DataFixtures;

use Faker;
use App\Entity\Tours;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

class ToursFixtures extends Fixture implements OrderedFixtureInterface
{

    public function load(ObjectManager $manager)
    {
        $faker = Faker\Factory::create('fr_FR');
        $i=0;
        $o=0;
       
        for($u = 0; $u < 20; $u++) {
            $tours = new Tours();
            $tours->setTitle($faker->sentence($nbWords = 6, $variableNbWords = true))
                   ->setDescription($faker->text($maxNbChars = 200) )
                   ->setDays($faker->randomDigit)
                   ->setPrice($faker->numberBetween($min = 400, $max = 2000))
                   ->setImage($faker->imageUrl($width = 640, $height = 480))
                   ->setNameImage($faker->sentence($nbWords = 6, $variableNbWords = true) );
                           
                   $tours->addDestination($this->getReference('destination-'. $i));
                   $i++;
                   
                   $manager->persist($tours); 

                   $this->addReference('tour-' . $u, $tours);
                   $o++;
       }


        $manager->flush();
    }

    /**
     * Get the order of this fixture
     *
     * @return integer
     */
    function getOrder()
    {
        return 2;
    }
}