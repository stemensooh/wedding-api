import { SetMetadata } from '@nestjs/common';

export const jwtConstants = {
  secret:
    'dOfJ9##L5W3xym@$i3ezAkKY6l7eP8WjIK1v35ou9HriqFRGC^',
};

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
