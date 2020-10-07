import { FeaturedItemDto } from './FeaturedItemDto';

export class FeaturedDto
{
    Title: string;
    Items: FeaturedItemDto[];
    constructor(title: string)
    {
        this.Items = [];
        this.Title = title
    }
}