<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\OpinionRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass=OpinionRepository::class)
 */
class Opinion
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $notice;

    /**
     * @ORM\ManyToOne(targetEntity=tours::class, inversedBy="opinions")
     */
    private $tours;

    /**
     * @ORM\ManyToOne(targetEntity=user::class, inversedBy="opinions")
     */
    private $user;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNotice(): ?string
    {
        return $this->notice;
    }

    public function setNotice(string $notice): self
    {
        $this->notice = $notice;

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

    public function getUser(): ?user
    {
        return $this->user;
    }

    public function setUser(?user $user): self
    {
        $this->user = $user;

        return $this;
    }
}
