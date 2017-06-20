# MMM-Facial-Recognition

This is a modified version of Paul-Vincent Roll's module for [module](https://github.com/paviro/MMM-Facial-Recognition) swapping for the [MagicMirror](https://github.com/MichMich/MagicMirror).

## Usage


The entry in config.js can look like the following.

```
{
	module: 'MMM-Facial-Recognition',
	config: {
		// 1=LBPH | 2=Fisher | 3=Eigen
		recognitionAlgorithm: 1,
		// Threshold for the confidence of a recognized face before it's considered a
		// positive match.  Confidence values below this threshold will be considered
		// a positive match because the lower the confidence value, or distance, the
		// more confident the algorithm is that the face was correctly detected.
		lbphThreshold: 50,
		fisherThreshold: 250,
		eigenThreshold: 3000,
		// force the use of a usb webcam on raspberry pi (on other platforms this is always true automatically)
		useUSBCam: false,
		// Path to your training xml
		trainingFile: 'modules/MMM-Facial-Recognition/training.xml',
		// recognition intervall in seconds (smaller number = faster but CPU intens!)
		interval: 2,
		// Logout delay after last recognition so that a user does not get instantly logged out if he turns away from the mirror for a few seconds
		logoutDelay: 15,
		// Array with usernames (copy and paste from training script)
		users: [],
		//Module set used for strangers and if no user is detected
		defaultClass: "default",
		//Set of modules which should be shown for every user
		everyoneClass: "everyone",
		// Boolean to toggle welcomeMessage
		welcomeMessage: true
	}
}
```

In this modified version you only need to change the *users* variable. The rest can be ignored. They could potentially be removed all together, but I haven't had time to test if the system crashes if the variables does not exists

In order for this module to do anything useful you have to assign custom classes to your modules. The class `default` (if you don't change it) is shown if no user is detected or a stranger. The class `everyone` (if you don't change it) is shown for all users. To specify modules for a certain user, use their name as classname.

```
{
	module: 'example_module',
	position: 'top_left',
	//Set your classes here seperated by a space.
	//Shown for all users
	classes: 'default everyone'
},
{
	module: 'example_module2',
	position: 'top_left',
	//Only shown for me
	classes: 'Paul-Vincent'
}
```

