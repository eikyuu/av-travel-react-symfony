<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\OpinionRepository;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(
 * normalizationContext={"groups"={"opinions_read"}}
 * )
 * @ORM\Entity(repositoryClass=OpinionRepository::class)
 */
class Opinion
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"opinions_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"opinions_read"})
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
