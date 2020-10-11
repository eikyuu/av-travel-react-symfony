<?php

namespace App\Entity;

use App\Entity\Tours;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\DestinationRepository;
use ApiPlatform\Core\Annotation\ApiFilter;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints as Assert;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;


/**
 * @ORM\Entity(repositoryClass=DestinationRepository::class)
 * @ApiResource(
 * subresourceOperations={
 *      "tours_get_subresource"={"path"="/destination/{id}/tours"},
 *      "api_tours_destinations_get_subresource"={
 *          "normalization_context"={"groups"={"destinations_subresource"}}
 *  }
 * },
 * collectionOperations={"GET", "POST"},
 * itemOperations={"GET", "PUT", "DELETE", "PATCH"},
 * normalizationContext={
 *      "groups"={"destination_read"}
 * },
 * denormalizationContext={"disable_type_enforcement"=true}
 * )
 * @ApiFilter(SearchFilter::class, properties={"title":"partial", "country":"partial", "city":"partial"})
 * @ApiFilter(OrderFilter::class)
 */
class Destination
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"destination_read", "tours_read", "destinations_subresource"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=55)
     * @Groups({"destination_read", "tours_read", "destinations_subresource"})
     * @Assert\NotBlank(message="le titre de la destination est obligatoire")
     * @Assert\Type(type="string", message="le titre dois etre au format texte !")
     * @Assert\Length(min=3 , minMessage="le titre doit faire entre 3 et 55 caracteres", max=55, maxMessage="le titre doit faire entre 3 et 55 caracteres")
     */
    private $title;

    /**
     * @ORM\Column(type="text")
     * @Groups({"destination_read", "tours_read", "destinations_subresource"})
     * @Assert\NotBlank(message="la description de la destination est obligatoire")
     * @Assert\Type(type="string", message="la description dois etre au format texte !")
     * @Assert\Length(min=3 , minMessage="la description doit faire entre 3 et 1500 caracteres", max=1500, maxMessage="la description doit faire entre 3 et 500 caracteres")
     */
    private $description;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"destination_read", "tours_read", "destinations_subresource"})
     * @Assert\NotBlank(message="le pays de la destination est obligatoire")
     * @Assert\Type(type="string", message="le pays dois etre au format texte !")
     */
    private $country;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"destination_read", "tours_read", "destinations_subresource"})
     * @Assert\NotBlank(message="la ville de la destination est obligatoire")
     * @Assert\Type(type="string", message="la ville dois etre au format texte !")
     */
    private $city;

    /**
     * @ORM\Column(type="text")
     * @Groups({"destination_read", "tours_read", "destinations_subresource"})
     * @Assert\NotBlank(message="l'image de la destination est obligatoire")
     */
    private $image;

    /**
     * @ORM\ManyToMany(targetEntity=Tours::class, mappedBy="destinations", cascade={"persist"})
     * @Groups({"destination_read"})
     * @ApiSubresource(maxDepth=1)
     */
    private $tours;

    public function __construct()
    {
        $this->tours = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle($title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getCountry(): ?string
    {
        return $this->country;
    }

    public function setCountry(string $country): self
    {
        $this->country = $country;

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(string $city): self
    {
        $this->city = $city;

        return $this;
    }

    public function getImage(): ?string
    {
        return $this->image;
    }

    public function setImage(string $image): self
    {
        $this->image = $image;

        return $this;
    }

    /**
     * @return Collection|Tours[]
     */
    public function getTours(): Collection
    {
        return $this->tours;
    }

    public function addTour(Tours $tour): self
    {
        if (!$this->tours->contains($tour)) {
            $this->tours[] = $tour;
            $tour->addDestination($this);
        }

        return $this;
    }

    public function removeTour(Tours $tour): self
    {
        if ($this->tours->contains($tour)) {
            $this->tours->removeElement($tour);
            $tour->removeDestination($this);
        }

        return $this;
    }
}
