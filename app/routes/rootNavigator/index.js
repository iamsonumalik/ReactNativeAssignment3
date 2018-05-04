import { StackNavigator } from 'react-navigation';

import Gallery from '@containers/Gallery';

const RootNavigator = StackNavigator(
	{
		Gallery: {
			screen: Gallery,
		},
	},
	{
		initialRouteName: 'Gallery',
	}
);

export default RootNavigator;
