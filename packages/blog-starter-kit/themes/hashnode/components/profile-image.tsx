import React from 'react';
import { twMerge } from 'tailwind-merge';
import CustomImage from './custom-image'; // ✅ Uses CustomImage instead of next/image
import { resizeImage } from '../utils/image';
import { DEFAULT_AVATAR } from '../utils/const/images';

type Props = {
  user: {
    username?: string;
    name?: string;
    profilePicture?: string;
    isDeactivated?: boolean;
  } | null;
  blogURL?: string;
  postUrlForAnonymous?: string;
  width?: number;
  height?: number;
  className?: string;
};

export default class ProfileImage extends React.Component<Props> {
  profileImage: HTMLAnchorElement | null = null;

  componentDidMount() {
    if (!this.props.user || this.props.user.isDeactivated) {
      return;
    }
  }

  render() {
    const { user, blogURL, postUrlForAnonymous, width = 70, height = 70, className } = this.props;

    const profileSrc = user?.profilePicture
      ? resizeImage(user.profilePicture, { w: width, h: height, c: 'face' })
      : DEFAULT_AVATAR;

    return (
      <a
        href={
          blogURL
            ? blogURL
            : user && !user.isDeactivated
            ? `https://hashnode.com/@${user.username}`
            : postUrlForAnonymous
            ? postUrlForAnonymous
            : '#'
        }
        ref={(c) => {
          this.profileImage = c;
        }}
        className="relative block h-full w-full"
      >
        <CustomImage
          className={twMerge(className, 'relative z-20 block w-full rounded-full')}
          src={profileSrc}
          originalSrc={user?.profilePicture || DEFAULT_AVATAR}
          width={width}
          height={height}
          alt={user ? `${user.name}'s photo` : 'User avatar'}
        />
      </a>
    );
  }
}
