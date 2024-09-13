<?php


class ThefSocial
{
	
	
	public static function getFacebookShare($url, $title)
	{
		// param - pub=xa-4a8f28793a712e06&
		$url = urlencode($url);
		$title = urlencode($title);
		$share = "http://www.addthis.com/bookmark.php?v=250&source=tbx-250&s=facebook&url=$url&title=$title&content=$title";
		return $share;
	}
	
	
	
	public static function getTwitterShare($url, $title)
	{
		// param - pub=xa-4a8f28793a712e06&
		$url = urlencode($url);
		$title = urlencode($title);
		$share = "http://www.addthis.com/bookmark.php?v=250&source=tbx-250&s=twitter&url=$url&title=$title&content=$title";
		return $share;
	}
	
	
	
	public static function getGoogleShare($url, $title)
	{
		// param - pub=xa-4a8f28793a712e06&
		$url = urlencode($url);
		$title = urlencode($title);
		$share = "http://www.addthis.com/bookmark.php?v=250&source=tbx-250&s=google&url=$url&title=$title&content=$title";
		return $share;
	}
	
}