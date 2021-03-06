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

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"booking_read", "users_read"})
     */
    private $date;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"booking_read", "users_read"})
     */
    private $status;

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

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(\DateTimeInterface $date): self
    {
        $this->date = $date;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): self
    {
        $this->status = $status;

        return $this;
    }
}
