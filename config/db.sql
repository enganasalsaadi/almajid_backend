CREATE TABLE public.users
(
    user_id SERIAL NOT NULL,
    password character varying(200),
    email character varying(100) UNIQUE NOT NULL,
    fullname character varying(100) NOT NULL,
    type character varying(10),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id)
);

CREATE TABLE public.products
(
    product_id SERIAL NOT NULL,
    title  text,
    price Numeric
    description text NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (product_id)
);

CREATE TABLE public.times_spent
(
    time_id SERIAL NOT NULL,
    user_id integer NOT NULL,
    date DATE NOT NULL,  
    time_spent integer 
    PRIMARY KEY (id)
);

ALTER TABLE public.times_spent
    ADD FOREIGN KEY (user_id)
    REFERENCES public.users (user_id)
    ON DELETE CASCADE
    NOT VALID;


CREATE TABLE public.favorites_products
(
    favorite_id SERIAL NOT NULL,
    user_id integer NOT NULL,
    favorites_ids  text NOT NULL,  
    PRIMARY KEY (favorite_id)
);

ALTER TABLE public.favorites_products
    ADD FOREIGN KEY (user_id)
    REFERENCES public.users (user_id)
    ON DELETE CASCADE
    NOT VALID;