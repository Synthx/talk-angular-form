import { Pipe, PipeTransform } from '@angular/core';
import { filesize } from 'filesize';

@Pipe({
    standalone: true,
    name: 'fileSize',
})
export class FileSizePipe implements PipeTransform {
    transform(size: number): string {
        return filesize(size);
    }
}
