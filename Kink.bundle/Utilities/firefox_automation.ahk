#NoEnv  ; Recommended for performance and compatibility with future AutoHotkey releases.
; #Warn  ; Enable warnings to assist with detecting common errors.
SendMode Input  ; Recommended for new scripts due to its superior speed and reliability.
SetWorkingDir %A_ScriptDir%  ; Ensures a consistent starting directory.
SetTitleMatchMode, 2

if 1 = download
{
	WinActivate | Kink.com - Mozilla Firefox
	Send, n
	WinWait Add Downloads
	WinActivate Add Downloads
	Send, {Tab}{Tab}{Tab}
	Sleep, 500
	Send, %2%
	Sleep, 5000
	Send, {Enter}
	WinWaitClose Add Downloads
	WinActivate | Kink.com - Mozilla Firefox
	ExitApp
}
else if 1 = monitor
{
	Loop
	{
		IfWinExist, File Name Conflict!
		{
			WinActivate, File Name Conflict!
			WinGetPos,,,, height, A
			if % height = 310
			{
				radioHeight = 150
				buttonHeight = 280
			}
			else if % height = 293
			{
				radioHeight = 135
				buttonHeight = 265
			}
			else if % height = 276
			{
				radioHeight = 115
				buttonHeight = 245
			}
			MouseMove, 70, %radioHeight%, 0
			MouseClick, Left
			MouseMove, 410, %buttonHeight%, 0
			MouseClick, Left
		}
		else IfWinExist, DownThemAll! 
		{
			WinGetTitle, title
			StringReplace, title, title, %A_SPACE%-%A_SPACE%, |
			titleParts := StrSplit(title, "|")
			if % titleParts.Length() == 2
			{
				fileCounts := StrSplit(titleParts[1], "/")
				if % fileCounts[1] == fileCounts[2] and fileCounts[1] == 0
				{
					WinActivate, DownThemAll!
					WinClose, DownThemAll!
				}
				else if % fileCounts[1] == fileCounts[2]
				{
					WinActivate, DownThemAll!
					Send {Shift down}{Delete}{Shift Up}
					WinActivate, Remove downloads
					MouseMove, 130, 115
					MouseClick, Left
					WinActivate, Remove downloads
				}
				else if % fileCounts[1] <> fileCounts[2] and fileCounts[1] <> 0
				{
					WinActivate, DownThemAll!
					Send {Shift down}{Delete}{Shift Up}
					Sleep, 1000
					WinActivate, Remove downloads
					MouseMove, 130, 115
					MouseClick, Left
					Sleep, 1000
					Send {Ctrl down}a{Ctrl up}
					Sleep, 1000
					Send {Ctrl down}r{Ctrl up}
				}
			}
			; 0/0 - DownThemAll!
			; x/y - DownThemAll!
			; % - x/y - Mbps - DownThemAll!
		}
		else
		{
			ExitApp
		}
		Sleep, 10000
	}
}
else
{
	MsgBox, Exiting...
	ExitApp
}

^e::ExitApp