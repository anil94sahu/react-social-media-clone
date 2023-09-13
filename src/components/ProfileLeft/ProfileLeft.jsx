import React from 'react'
import LogoSearch from '../LogoSearch/LogoSearch';
import FollowersCard from '../FollowerCard/FollowerCard'
import InfoCard from '../InfoCard/InfoCard';
const ProfileLeft = () => {
  return (
    <div className="ProfileSide">
        <LogoSearch />
        <InfoCard />
        <FollowersCard />
    </div>
  )
}

export default ProfileLeft