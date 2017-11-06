'use strict';

import Block from '../blocks/block/block.js';
import ViewButton from '../views/view/__view-button/view__view-button';

const menuFields = {
	profile: Block.Create('div', {'data-section': 'profile'}, ['profile', 'auth'], ''),
	play: ViewButton.Create({href: '/game'}, ['auth'], 'Play'),
	signup: ViewButton.Create({href: '/signup'}, ['unauth'], 'Sign up'),
	login: ViewButton.Create({href: '/login'}, ['unauth'], 'Login'),
	update: ViewButton.Create({href: '/profile'}, ['auth'], 'Profile'),
	rules: ViewButton.Create({href: '/rules'}, ['every-available'], 'Rules'),
	scores: ViewButton.Create({href: '/scores'}, ['every-available'], 'Scoreboard'),
	exit: ViewButton.Create({href: '/exit'}, ['auth'],'Exit'),
};

export default menuFields;