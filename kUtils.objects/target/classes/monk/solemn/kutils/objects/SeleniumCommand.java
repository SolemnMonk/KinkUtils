package monk.solemn.kutils.objects;

import monk.solemn.kutils.enums.SeleniumCommandType;
import monk.solemn.kutils.enums.SeleniumSelectorType;

public class SeleniumCommand {
	private SeleniumSelectorType selectorType = SeleniumSelectorType.Xpath;
	private SeleniumCommandType commandType = SeleniumCommandType.ReadText;
	private String selector;
	private String attribute;
	
	public SeleniumCommand(SeleniumSelectorType selectorType, SeleniumCommandType commandType, String selector) {
		this.selectorType = selectorType;
		this.commandType = commandType;
		this.selector = selector;
	}
	
	public SeleniumCommand(SeleniumSelectorType selectorType, SeleniumCommandType commandType, String selector,
			String attribute) {
		this.selectorType = selectorType;
		this.commandType = commandType;
		this.selector = selector;
		this.attribute = attribute;
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("SeleniumCommand [selectorType=");
		builder.append(selectorType);
		builder.append(", commandType=");
		builder.append(commandType);
		builder.append(", selector=");
		builder.append(selector);
		builder.append(", attribute=");
		builder.append(attribute);
		builder.append("]");
		return builder.toString();
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((attribute == null) ? 0 : attribute.hashCode());
		result = prime * result + ((commandType == null) ? 0 : commandType.hashCode());
		result = prime * result + ((selector == null) ? 0 : selector.hashCode());
		result = prime * result + ((selectorType == null) ? 0 : selectorType.hashCode());
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
		SeleniumCommand other = (SeleniumCommand) obj;
		if (attribute == null) {
			if (other.attribute != null)
				return false;
		} else if (!attribute.equals(other.attribute))
			return false;
		if (commandType != other.commandType)
			return false;
		if (selector == null) {
			if (other.selector != null)
				return false;
		} else if (!selector.equals(other.selector))
			return false;
		if (selectorType != other.selectorType)
			return false;
		return true;
	}

	public SeleniumSelectorType getSelectorType() {
		return selectorType;
	}

	public void setSelectorType(SeleniumSelectorType selectorType) {
		this.selectorType = selectorType;
	}

	public SeleniumCommandType getCommandType() {
		return commandType;
	}

	public void setCommandType(SeleniumCommandType commandType) {
		this.commandType = commandType;
	}

	public String getSelector() {
		return selector;
	}

	public void setSelector(String selector) {
		this.selector = selector;
	}

	public String getAttribute() {
		return attribute;
	}

	public void setAttribute(String attribute) {
		this.attribute = attribute;
	}
}
