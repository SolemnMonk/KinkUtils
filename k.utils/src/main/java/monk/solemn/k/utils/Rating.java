package monk.solemn.k.utils;

public class Rating {
	private double avgRating;
	private int numRatings;
	
	public Rating(double avgRating, int numRatings) {
		this.avgRating = avgRating;
		this.numRatings = numRatings;
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("Rating [avgRating=");
		builder.append(avgRating);
		builder.append(", numRatings=");
		builder.append(numRatings);
		builder.append("]");
		return builder.toString();
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		long temp;
		temp = Double.doubleToLongBits(avgRating);
		result = prime * result + (int) (temp ^ (temp >>> 32));
		result = prime * result + numRatings;
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
		Rating other = (Rating) obj;
		if (Double.doubleToLongBits(avgRating) != Double.doubleToLongBits(other.avgRating))
			return false;
		if (numRatings != other.numRatings)
			return false;
		return true;
	}

	public double getAvgRating() {
		return avgRating;
	}

	public void setAvgRating(double avgRating) {
		this.avgRating = avgRating;
	}

	public int getNumRatings() {
		return numRatings;
	}

	public void setNumRatings(int numRatings) {
		this.numRatings = numRatings;
	}
}
