// This file is meant to reduce import statements in other files

// Import all static components 
import { NavButton, StyledButton } from './button.jsx';
import { DescriptionCard } from './description-card';
import { DescriptionLoadingCards } from './description-loading-cards';
import { ImageCard } from './image-card';
import { ImageLoadingCards } from './image-loading-cards';
import { PageHeader } from './page-header';
import { RecipeCard } from './recipeCard.jsx';
import { Tag } from './tag.jsx';

// Export all files for external use
export {
	NavButton, StyledButton,
	DescriptionCard, DescriptionLoadingCards,
	ImageCard, ImageLoadingCards,
	RecipeCard, Tag, PageHeader
}