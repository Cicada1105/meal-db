// Global imports
import { useNavigate } from 'react-router';
// Local imports
import { StyledButton, NavButton } from '../';
import styles from './index.module.css';

function PageHeader({ children }) {
  const navigate = useNavigate();

  return (
    <header className={styles.pageHeader}>
      <StyledButton onClickHandler={() => navigate(-1)}>Go Back</StyledButton>
      <h2>{ children }</h2>
      <NavButton text="Home" path="/Home" />
    </header>
  );
}

export { PageHeader };