<?php

namespace App\Entity;

use App\Entity\User;
use App\Entity\Destination;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\ToursRepository;
use ApiPlatform\Core\Annotation\ApiFilter;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use Symfony\Component\Validator\Constraints as Assert;


/**
 * @ORM\Entity(repositoryClass=ToursRepository::class)
 * @ApiResource(
 *  collectionOperations={"GET", "POST"},
 *  itemOperations={"GET", "PUT", "DELETE", "PATCH"},
 *  subresourceOperations={
 * *      "api_users_tours_get_subresource"={
 *          "normalization_context"={"groups"={"tours_subresource"}}
 * },
 *      "destinations_get_subresource"={"path"="/tours/{id}/destinations"},
 *      "api_destinations_tours_get_subresource"={
 *          "normalization_context"={"groups"={"tours_subresource"}}
 *  }
 * },
 *  normalizationContext={
 *      "groups"={"tours_read"}
 *  },
 * denormalizationContext={"disable_type_enforcement"=true}
 * )
 * @ApiFilter(SearchFilter::class, properties={"title":"partial", "price":"partial"})
 * @ApiFilter(OrderFilter::class, properties={"price"})
 */
class Tours
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"tours_read", "destination_read", "tours_subresource"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=55)
     * @Groups({"tours_read", "destination_read", "tours_subresource"})
     * @Assert\NotBlank(message="le titre du tours est obligatoire")
     * @Assert\Type(type="string", message="le titre dois etre au format texte !")
     * @Assert\Length(min=3 , minMessage="le titre doit faire entre 3 et 55 caracteres", max=55, maxMessage="le titre doit faire entre 3 et 55 caracteres")
     */
    private $title;

    /**
     * @ORM\Column(type="string", length=200)
     * @Groups({"tours_read", "destination_read", "tours_subresource"})
     * @Assert\NotBlank(message="la description du tours est obligatoire")
     * @Assert\Type(type="string", message="la description dois etre au format texte !")
     * @Assert\Length(min=3 , minMessage="la description doit faire entre 3 et 200 caracteres", max=200, maxMessage="la description doit faire entre 3 et 200 caracteres")
     */
    private $description;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"tours_read", "destination_read", "tours_subresource"})
     * @Assert\NotBlank(message="le nombre de jours du tours est obligatoire")
     * @Assert\Type(type="integer", message="le nombre de jours dois etre au format numeric !")
     */
    private $days;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"tours_read", "destination_read", "tours_subresource"})
     * @Assert\NotBlank(message="le prix du tours est obligatoire")
     * @Assert\Type(type="integer", message="le prix dois etre au format numeric !")
     */
    private $price;

    /**
     * @ORM\Column(type="text")
     * @Groups({"tours_read", "destination_read", "tours_subresource"})
     * @Assert\NotBlank(message="l'image du tours est obligatoire")
     */
    private $image;

    /**
     * @ORM\ManyToMany(targetEntity=Destination::class, inversedBy="destinations", cascade={"persist"})
     * @ORM\JoinTable(name="destination_tours")
     * @Groups({"tours_read"})
     * @ApiSubresource(maxDepth=1)
     */
    private $destinations;

    /**
     * @ORM\ManyToMany(targetEntity=User::class, mappedBy="tours")
     * @Groups({"tours_read", "destination_read"})
     */
    private $users;

    /**
     * @ORM\OneToMany(targetEntity=Opinion::class, mappedBy="tours")
     */
    private $opinions;

    public function __construct()
    {
        $this->destinations = new ArrayCollection();
        $this->users = new ArrayCollection();
        $this->opinions = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
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

    public function getDays(): ?int
    {
        return $this->days;
    }

    public function setDays(int $days): self
    {
        $this->days = $days;

        return $this;
    }

    public function getPrice(): ?int
    {
        return $this->price;
    }

    public function setPrice(int $price): self
    {
        $this->price = $price;

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
     * @return Collection|Destination[]
     */
    public function getDestinations(): Collection
    {
        return $this->destinations;
    }

    public function addDestination(Destination $destination): self
    {
        if (!$this->destinations->contains($destination)) {
            $this->destinations[] = $destination;
            $destination->addTour($this);
        }

        return $this;
    }

    public function removeDestination(Destination $destination): self
    {
        if ($this->destinations->contains($destination)) {
            $this->destinations->removeElement($destination);
            $destination->removeTour($this);
        }

        return $this;
    }

    /**
     * @return Collection|User[]
     */
    public function getUsers(): Collection
    {
        return $this->users;
    }

    public function addUser(User $user): self
    {
        if (!$this->users->contains($user)) {
            $this->users[] = $user;
            $user->addTour($this);
        }

        return $this;
    }

    public function removeUser(User $user): self
    {
        if ($this->users->contains($user)) {
            $this->users->removeElement($user);
            $user->removeTour($this);
        }

        return $this;
    }

    /**
     * @return Collection|Opinion[]
     */
    public function getOpinions(): Collection
    {
        return $this->opinions;
    }

    public function addOpinion(Opinion $opinion): self
    {
        if (!$this->opinions->contains($opinion)) {
            $this->opinions[] = $opinion;
            $opinion->setTours($this);
        }

        return $this;
    }

    public function removeOpinion(Opinion $opinion): self
    {
        if ($this->opinions->contains($opinion)) {
            $this->opinions->removeElement($opinion);
            // set the owning side to null (unless already changed)
            if ($opinion->getTours() === $this) {
                $opinion->setTours(null);
            }
        }

        return $this;
    }
}
