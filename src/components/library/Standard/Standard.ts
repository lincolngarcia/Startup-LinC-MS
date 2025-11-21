import Standard_FeatureStacked from './Feature/Stacked';
import Standard_FeatureStackedCard from './Feature/StackedCard'
import Standard_IntroStacked from './Intro/Stacked';
import Standard_Menu from './Menu/Standard';
import Standard_StaticScroll from './Layout/StaticScroll';
import Standard_BulletList from "./Helper/BulletList"
import Standard_ImageLeft from './Layout/ImageLeft';

//import StandardLayoutImageLeft from './StandardLayoutImageLeft';
//import StandardMenuStandard from './StandardMenuStandard';

const StandardExports =
{
    "standard_featurestacked": Standard_FeatureStacked,
    "standard_featurestackedcard": Standard_FeatureStackedCard,
    "standard_introstacked": Standard_IntroStacked,
    "standard_menu": Standard_Menu,
    "standard_bulletlist": Standard_BulletList, // Maybe a require statement could streamline this
    "standard_imageleft": Standard_ImageLeft,
    // "standard_staticscroll": Standard_StaticScroll,
}

export default StandardExports