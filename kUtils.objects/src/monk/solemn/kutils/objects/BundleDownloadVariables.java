package monk.solemn.kutils.objects;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class BundleDownloadVariables {
	private long currentItemNumber;
	private long totalItemCount;
	private long minimumNumberWidth;
	private static final List<String> tokenNames = Arrays.asList(
			"itemNumber",
			"itemCount",
			"minimumNumberWidth"
			);
	
	public BundleDownloadVariables() {
		super();
	}

	public static Class<?> getVariableType(String token) {
		token = sanitizeToken(token);
		
		switch (token) {
		case "itemNumber":
		case "itemCount":
		case "minimumNumberWidth":
			return Number.class;
		default:
			return null;
		}
	}
	
	public long getNumberVariable(String token) {
		return getNumberVariable(token, true);
	}
	
	public long getNumberVariable(String token, boolean bumpValue) {
		token = sanitizeToken(token);
		
		switch (token) {
		case "itemNumber":
			long itemNumber = getCurrentItemNumber();
			if (bumpValue) {
				increaseCurrentItemNumber();
			}
			return itemNumber;
		case "itemCount":
			return getTotalItemCount();
		case "minimumNumberWidth":
			return getMinimumNumberWidth();
		default:
			return 0;
		}
	}
	
	@Override
	public String toString() {
		return "BundleDownloadVariables [currentItemNumber=" + currentItemNumber + ", totalItemCount=" + totalItemCount
				+ ", tokenNames=" + tokenNames + "]";
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + (int) (currentItemNumber ^ (currentItemNumber >>> 32));
		result = prime * result + (int) (minimumNumberWidth ^ (minimumNumberWidth >>> 32));
		result = prime * result + (int) (totalItemCount ^ (totalItemCount >>> 32));
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
		BundleDownloadVariables other = (BundleDownloadVariables) obj;
		if (currentItemNumber != other.currentItemNumber)
			return false;
		if (minimumNumberWidth != other.minimumNumberWidth)
			return false;
		if (totalItemCount != other.totalItemCount)
			return false;
		return true;
	}

	public void increaseCurrentItemNumber() {
		increaseCurrentItemNumber(1);
	}

	public void increaseCurrentItemNumber(int amount) {
		this.currentItemNumber += Math.abs(amount);
	}
	
	public void decreaseCurrentItemNumber() {
		decreaseCurrentItemNumber(1);
	}
	
	public void decreaseCurrentItemNumber(int amount) {
		this.currentItemNumber -= Math.abs(amount);
	}
	
	public long getCurrentItemNumber() {
		return currentItemNumber;
	}

	public void setCurrentItemNumber(long currentItemNumber) {
		this.currentItemNumber = currentItemNumber;
	}

	public long getTotalItemCount() {
		return totalItemCount;
	}

	public void setTotalItemCount(long totalItemCount) {
		this.totalItemCount = totalItemCount;
	}

	public long getMinimumNumberWidth() {
		if (this.minimumNumberWidth == -1) {
			return String.valueOf(totalItemCount).length();
		} else {
			return minimumNumberWidth;
		}
	}

	public void setMinimumNumberWidth(long minimumNumberWidth) {
		if (minimumNumberWidth < 0) {
			this.minimumNumberWidth = -1;
		} else {
			this.minimumNumberWidth = minimumNumberWidth;
		}
	}

	public static List<String> getTokenNames() {
		List<String> toReturn = new ArrayList<>();
		for (String name : tokenNames) {
			toReturn.add(name);
		}
		
		return toReturn;
	}
	
	private static String sanitizeToken(String token) {
		if (token.startsWith("%")) {
			token = token.substring(1);
		}
		if (token.endsWith("%")) {
			token = token.substring(0, token.length() - 1);
		}
		return token;
	}
}
