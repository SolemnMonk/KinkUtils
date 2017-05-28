package monk.solemn.kutils.plugin.lexi_belle_raw;

import java.text.MessageFormat;
import java.util.List;
import java.util.UUID;

import hall.caleb.selenium.objects.command.CommandFactory;
import hall.caleb.selenium.objects.command.GoToCommand;
import monk.solemn.kutils.objects.QueuedTask;
import monk.solemn.kutils.utilities.high.SeleniumServerUtilities;

public class Ripper {
	public static void performRip(UUID seleniumId, QueuedTask task) {
		boolean siteHasMoreShoots = true;
		int shootsOnPage = 0;
		List<String> shootLinks;

		GoToCommand goTo;

		for (int page = 1; siteHasMoreShoots; page++) {
			goTo = CommandFactory.newGoToCommand(seleniumId,
					MessageFormat.format(LexiBelleRawPlugin.getUrl(key), arg1));

			shootLinks = KinkUtilities.getShootLinks(seleniumId);
			shootsOnPage = shootLinks.size();

			if (shootsOnPage == 0) {
				siteHasMoreShoots = false;
				continue;
			} else if (shootsOnPage == 10) {
				siteHasMoreShoots = true;
			} else {
				siteHasMoreShoots = false;
			}

			for (String link : shootLinks) {
				ripShoot(seleniumId, link, task);
				SeleniumServerUtilities.sendSeleniumCommand(CommandFactory.newBackCommand(seleniumId));
			}
		}
	}

	private static void ripVideos(UUID seleniumId, QueuedTask task) {

	}

	private static void ripPictures(UUID seleniumId, QueuedTask task) {

	}

	private static void ripShoot(UUID seleniumId, String url, QueuedTask task) {
		Downloader.downloadShoot(seleniumId, url, task);
	}
}
