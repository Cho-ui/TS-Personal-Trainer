export interface ICustomer {
    customerArray: {
        firstname: string,
        lastname: string,
        streetaddress: string,
        postcode: string,
        city: string,
        email: string,
        phone: string,
        content?: [],
        links?: [{rel: string, href: string}, 
            {rel: string, href: string}]
    }[],
    customer: {
        firstname?: string,
        lastname?: string,
        streetaddress?: string,
        postcode?: string,
        city?: string,
        email?: string,
        phone?: string
    }
};

export interface ISession {
    sessionArray: {
        title?: string,
        start?: string,
        end?: string,
        duration?: number,
        allDay?: boolean
    }[],
    session: {
        title?: string,
        start?: string,
        end?: string,
        duration?: number,
        allDay?: boolean
    }
};

export interface IStats {
    statObjArray: {
        activity: string,
        performed: number
    }[],
    statObj: {
        activity: string,
        performed: number
    }
}

export interface IActivity {
    activityArray: {
        id: number,
        date: string,
        duration: number,
        activity: string,
        customer: {
            id: number,
            firstname: string,
            lastname: string,
            streetaddress: string,
            postcode: string,
            city: string,
            email: string,
            phone: string
        }
    }[],
    activity: {
        date?: string,
        activity?: string,
        duration?: number,
        customer?: string
    },
    activityWithCustomer: {
        date?: string,
        activity?: string,
        duration?: number,
        customer: {
            id: number,
            firstname: string,
            lastname: string,
            streetaddress: string,
            postcode: string,
            city: string,
            email: string,
            phone: string
        }
    },
    activityWithoutCustomerArray: {
        date: string,
        duration: number,
        activity: string,
        content?: [],
        links?: [{rel: string, href: string}, 
            {rel: string, href: string},
            {rel: string, href: string}]
    }[],
    activityWithoutCustomer: {
        date: string,
        duration: number,
        activity: string,
        content?: [],
        links?: [{rel: string, href: string}, 
            {rel: string, href: string},
            {rel: string, href: string}]
    },
    activityStatsArray: {
        activity: string,
        duration: number
    }[],
    activityStats: {
        activity: string,
        duration: number
    }
};