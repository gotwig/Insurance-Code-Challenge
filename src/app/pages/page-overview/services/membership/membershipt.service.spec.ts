import {TestBed} from '@angular/core/testing';

import {MembershipService} from './membership.service';

describe('MembershiptService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: MembershipService = TestBed.get(MembershipService);
        expect(service).toBeTruthy();
    });
});
