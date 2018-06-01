package monk.solemn.kutils.objects;

import java.util.Map;

import monk.solemn.kutils.enums.Action;
import monk.solemn.kutils.enums.EntityClass;

public class Task {
	private Action action;
	private EntityClass target;
	private Map<String, String> data;
	
	public Task(Action action, EntityClass target) {
		this.action = action;
		this.target = target;
	}
	
	public Task(Action action, EntityClass target, Map<String, String> data) {
		this(action, target);
		this.data = data;
	}

	@Override
	public String toString() {
		return "Task [action=" + action + ", target=" + target + ", data=" + data + "]";
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((action == null) ? 0 : action.hashCode());
		result = prime * result + ((data == null) ? 0 : data.hashCode());
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
		if (data == null) {
			if (other.data != null)
				return false;
		} else if (!data.equals(other.data))
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

	public EntityClass getTarget() {
		return target;
	}

	public void setTarget(EntityClass target) {
		this.target = target;
	}

	public Map<String, String> getData() {
		return data;
	}

	public void setData(Map<String, String> data) {
		this.data = data;
	}
}
