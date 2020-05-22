<?php

namespace App\DataFixtures;

use Faker;
use App\Entity\Destination;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

class DestinationFixtures extends Fixture implements OrderedFixtureInterface
{

    public function load(ObjectManager $manager)
    {
        $faker = Faker\Factory::create('fr_FR');
        $u=0;
        for($i = 0; $i < 20; $i++) {
            $destination = new Destination();
            $destination->setTitle($faker->sentence($nbWords = 6, $variableNbWords = true))
                        ->setDescription($faker->text($maxNbChars = 200) )
                        ->setPays($faker->country)
                        ->setCity($faker->city)
                        ->setImage($faker->imageUrl($width = 640, $height = 480));

            $manager->persist($destination);
            $this->addReference('destination-' . $u, $destination);
            $u++;
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
        return 1;
    }
}
