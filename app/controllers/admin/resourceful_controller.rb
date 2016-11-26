module Admin
  class ResourcefulController < AdminController
    def index
      @collection = scope
                    .order(order)
                    .paginate(page: params[:page], per_page: per_page)
    end

    def show
      @record ||= load_record
    end

    def new
      @record ||= scope.new
    end

    def create
      @record ||= scope.new(permitted_params)
      if @record.save
        redirect_to [:admin, index_key]
      else
        render 'new'
      end
    end

    def edit
      @record ||= load_record
    end

    def update
      @record ||= load_record
      if @record.update(permitted_params)
        redirect_to [:admin, index_key]
      else
        render 'new'
      end
    end

    def destroy
      @record ||= load_record
      @record.destroy
      redirect_to [:admin, index_key]
    end

    private

    def load_record
      scope.find(params[:id])
    end

    def scope
      model_class.all
    end

    def per_page
      16
    end

    def model_name
      @model_name ||= begin
        controller_name =
          self.class.name.gsub!('Admin::', '').gsub!('Controller', '')
        controller_name.singularize
      end
    end

    def index_key
      @index_key ||= model_name.pluralize.downcase.to_sym
    end

    def model_class
      @model_class ||= model_name.safe_constantize
    end

    def order
      { created_at: :desc }
    end

    def permitted_params
      root_key = model_name.downcase.to_sym
      return {} unless params[root_key]
      params.require(root_key).permit(permitted_attributes)
    end

    def permitted_attributes
      []
    end
  end
end
