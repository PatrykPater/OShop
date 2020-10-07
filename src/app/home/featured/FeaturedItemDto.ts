export class FeaturedItemDto
{
    Title: string;
    ImgUrl: string;
    constructor(title: string, imgUrl: string)
    {
        this.Title = title;
        this.ImgUrl = imgUrl;
    }
}