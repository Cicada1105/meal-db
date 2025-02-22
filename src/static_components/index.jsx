// This file is meant to reduce import statements in other files

// Import all static components 
import { NavButton, StyledButton } from './button.jsx';
import { DescriptionCard } from './descriptionCard.jsx';
import { DescriptionLoadingCards } from './description-loading-cards';
import { ImageCard } from './imageCard.jsx';
import { ImageLoadingCards } from './image-loading-cards';
import { RecipeCard } from './recipeCard.jsx';
import { Tag } from './tag.jsx';

// Export all files for external use
export {
	NavButton, StyledButton,
	DescriptionCard, DescriptionLoadingCards,
	ImageCard, ImageLoadingCards,
	RecipeCard, Tag
}