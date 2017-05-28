package monk.solemn.kutils.objects;

import java.awt.Image;
import java.util.Calendar;
import java.util.LinkedList;
import java.util.List;

import monk.solemn.kutils.enums.ShootType;

public class Shoot {
	private Long id;
	private String site;
	private ShootType shootType;
	private String title;
	private String description;
	private Calendar date;
	private List<String> tags;
	private Rating rating;
	private List<Actor> actors;
	private KUtilsImage coverImage;
	private List<KUtilsImage> previewImages;
	private String externalUrl;
	private List<Shoot> companionShoots;

	public Shoot(String title) {
		this.site = "";
		this.shootType = ShootType.Unknown;
		this.title = title;
		this.description = "";
		this.date = Calendar.getInstance();
		this.tags = new LinkedList<String>();
		this.rating = new Rating(0.0, 0);
		this.actors = new LinkedList<Actor>();
		this.previewImages = new LinkedList<KUtilsImage>();
		this.externalUrl = "";
		this.companionShoots = new LinkedList<Shoot>();

		this.date.setTimeInMillis(0);
	}

	public Shoot(String site, ShootType shootType, String title, String description, Calendar date, List<String> tags,
			Rating rating, List<Actor> actors, KUtilsImage coverImage, List<KUtilsImage> previewImages,
			String externalUrl, List<Shoot> companionShoots) {
		this.site = site;
		this.shootType = shootType;
		this.title = title;
		this.description = description;
		this.date = date;
		this.tags = (tags != null ? tags : new LinkedList<String>());
		this.rating = rating;
		this.actors = (actors != null ? actors : new LinkedList<Actor>());
		this.coverImage = coverImage;
		this.previewImages = (previewImages != null ? previewImages : new LinkedList<KUtilsImage>());
		this.externalUrl = externalUrl;
		this.companionShoots = (companionShoots != null ? companionShoots : new LinkedList<Shoot>());
	}

	public void addTag(String tag) {
		tags.add(tag);
	}

	public void removeTag(String tag) {
		tags.remove(tag);
	}

	public void addActor(Actor actor) {
		actors.add(actor);
	}

	public void removeActor(Actor actor) {
		actors.remove(actor);
	}

	public void addPreviewImage(KUtilsImage image) {
		previewImages.add(image);
	}

	public void removePreviewImage(Image image) {
		previewImages.remove(image);
	}

	public void addCompanionShoot(Shoot companionShoot) {
		companionShoots.add(companionShoot);
	}

	public void removeCompanionShoot(Shoot companionShoot) {
		companionShoots.remove(companionShoot);
	}

	public void unloadImages() {
		coverImage.unloadImage();
		for (KUtilsImage image : previewImages) {
			image.unloadImage();
		}
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("Shoot [id=");
		builder.append(id);
		builder.append(", site=");
		builder.append(site);
		builder.append(", shootType=");
		builder.append(shootType);
		builder.append(", title=");
		builder.append(title);
		builder.append(", description=");
		builder.append(description);
		builder.append(", date=");
		builder.append(date);
		builder.append(", tags=");
		builder.append(tags);
		builder.append(", rating=");
		builder.append(rating);
		builder.append(", externalUrl=");
		builder.append(externalUrl);
		builder.append("]");
		return builder.toString();
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((date == null) ? 0 : date.hashCode());
		result = prime * result + ((description == null) ? 0 : description.hashCode());
		result = prime * result + ((externalUrl == null) ? 0 : externalUrl.hashCode());
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((rating == null) ? 0 : rating.hashCode());
		result = prime * result + ((shootType == null) ? 0 : shootType.hashCode());
		result = prime * result + ((site == null) ? 0 : site.hashCode());
		result = prime * result + ((tags == null) ? 0 : tags.hashCode());
		result = prime * result + ((title == null) ? 0 : title.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Shoot other = (Shoot) obj;
		if (date == null) {
			if (other.date != null)
				return false;
		} else if (!date.equals(other.date))
			return false;
		if (description == null) {
			if (other.description != null)
				return false;
		} else if (!description.equals(other.description))
			return false;
		if (externalUrl == null) {
			if (other.externalUrl != null)
				return false;
		} else if (!externalUrl.equals(other.externalUrl))
			return false;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (rating == null) {
			if (other.rating != null)
				return false;
		} else if (!rating.equals(other.rating))
			return false;
		if (shootType != other.shootType)
			return false;
		if (site == null) {
			if (other.site != null)
				return false;
		} else if (!site.equals(other.site))
			return false;
		if (tags == null) {
			if (other.tags != null)
				return false;
		} else if (!tags.equals(other.tags))
			return false;
		if (title == null) {
			if (other.title != null)
				return false;
		} else if (!title.equals(other.title))
			return false;
		return true;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getSite() {
		return site;
	}

	public void setSite(String site) {
		this.site = site;
	}

	public ShootType getShootType() {
		return shootType;
	}

	public void setShootType(ShootType shootType) {
		this.shootType = shootType;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Calendar getDate() {
		return date;
	}

	public void setDate(Calendar date) {
		this.date = date;
	}

	public List<String> getTags() {
		return tags;
	}

	public void setTags(List<String> tags) {
		this.tags = tags;
	}

	public Rating getRating() {
		return rating;
	}

	public void setRating(Rating rating) {
		this.rating = rating;
	}

	public List<Actor> getActors() {
		return actors;
	}

	public void setActors(List<Actor> actors) {
		this.actors = actors;
	}

	public KUtilsImage getCoverImage() {
		return coverImage;
	}

	public void setCoverImage(KUtilsImage coverImage) {
		this.coverImage = coverImage;
	}

	public List<KUtilsImage> getPreviewImages() {
		return previewImages;
	}

	public void setPreviewImages(List<KUtilsImage> previewImages) {
		this.previewImages = previewImages;
	}

	public String getExternalUrl() {
		return externalUrl;
	}

	public void setExternalUrl(String externalUrl) {
		this.externalUrl = externalUrl;
	}

	public List<Shoot> getCompanionShoots() {
		return companionShoots;
	}

	public void setCompanionShoots(List<Shoot> companionShoots) {
		this.companionShoots = companionShoots;
	}
}