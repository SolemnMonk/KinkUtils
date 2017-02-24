package monk.solemn.kutils.objects;

import monk.solemn.kutils.enums.Action;
import monk.solemn.kutils.enums.Target;

public class Task {
	private Action action;
	private Target target;
	
	public Task(Action action, Target target) {
		this.action = action;
		this.target = target;
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("Task [action=");
		builder.append(action);
		builder.append(", target=");
		builder.append(target);
		builder.append("]");
		return builder.toString();
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((action == null) ? 0 : action.hashCode());
		result = prime * result + ((target == null) ? 0 : target.hashCode());
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
		Task other = (Task) obj;
		if (action != other.action)
			return false;
		if (target != other.target)
			return false;
		return true;
	}

	public Action getAction() {
		return action;
	}

	public void setAction(Action action) {
		this.action = action;
	}

	public Target getTarget() {
		return target;
	}

	public void setTarget(Target target) {
		this.target = target;
	}
}
