def get_curried_conflict_fn(conf_name, input_data):
    
    def conflict_fn_1(param1):
        print("In conflict_fn_1", param1, input_data)

    def conflict_fn_2(param1):
        print("In conflict_fn_2", param1, input_data)

    return locals()[conf_name]

get_curried_conflict_fn("conflict_fn_1", 10)(20)
get_curried_conflict_fn("conflict_fn_2", 30)(40)
    
