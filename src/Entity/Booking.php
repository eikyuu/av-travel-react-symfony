<?php

namespace App\Entity;

use App\Entity\Tours;
use App\Entity\User;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\BookingRepository;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(
 * normalizationContext={"groups"={"booking_read"}}
 * )
 * @ORM\Entity(repositoryClass=BookingRepository::class)
 */
class Booking
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"booking_read", "users_read", "users_read"})
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity=user::class, inversedBy="bookings")
     * @Groups({"booking_read"})
     */
    private $user;

    /**
     * @ORM\ManyToOne(targetEntity=tours::class, inversedBy="bookings")
     * @Groups({"booking_read", "users_read"})
     */
    private $tours;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUser(): ?user
    {
        return $this->user;
    }

    public function setUser(?user $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getTours(): ?tours
    {
        return $this->tours;
    }

    public function setTours(?tours $tours): self
    {
        $this->tours = $tours;

        return $this;
    }
}
